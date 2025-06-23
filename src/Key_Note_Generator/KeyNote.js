import React, { useState, useEffect, useRef } from 'react';
import './Keynotes.css';

const Keynotes = () => {
  // State management
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to record!');
  const [statusType, setStatusType] = useState('');
  const [error, setError] = useState('');

  // Refs
  const recognitionRef = useRef(null);
  const fullTranscriptRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported. Please use Chrome or Edge browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    // Configure recognition
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    // Event handlers
    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setStatusMessage('🎤 Listening... Speak now!');
      setStatusType('listening');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        } else {
          interimTranscript += transcriptPart;
        }
      }

      if (finalTranscript) {
        fullTranscriptRef.current += finalTranscript;
      }
      setTranscript(fullTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
      setStatusMessage(`❌ Error: ${event.error}`);
      setStatusType('error');
    };

    recognition.onend = () => {
      if (isListening) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
        }
      } else {
        setStatusMessage('🔇 Recording stopped');
        setStatusType('');
      }
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening]);

  const startRecording = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch {
        setError('Could not start speech recognition');
        setStatusMessage('❌ Could not start recording');
        setStatusType('error');
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const clearAll = () => {
    fullTranscriptRef.current = '';
    setTranscript('');
    setNotes('');
    setError('');
    setStatusMessage('Cleared!');
    setStatusType('');
  };

  // 🟢 NO API KEY handling here!
  const generateNotes = async () => {
    const currentTranscript = transcript.trim();
    
    if (!currentTranscript) {
      alert('Please record some speech first!');
      return;
    }

    setIsGenerating(true);
    setStatusMessage('🤖 AI is creating your notes...');
    setStatusType('generating');

    try {
      const response = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: currentTranscript }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.notes) {
        setNotes(data.notes);
        setStatusMessage('✅ Notes generated successfully!');
        setStatusType('success');
      } else {
        throw new Error('No notes returned from server');
      }

    } catch (error) {
      setStatusMessage(`❌ Error: ${error.message}`);
      setStatusType('error');
    } finally {
      setIsGenerating(false);
    }
  };

  if (error && error.includes('not supported')) {
    return (
      <div className="keynotes-container">
        <div className="keynotes-error">
          <h2>❌ Speech Recognition Not Supported</h2>
          <p>Please use Chrome or Edge browser for speech recognition functionality.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="keynotes-container">
      <div className="keynotes-header">
        <h1>Key Note</h1>
      </div>

      {/* Voice Controls */}
      <div className="keynotes-section">
        <h3>🎙️ Record Audio</h3>
        <div className="keynotes-buttons">
          <button
            className={`keynotes-btn ${isListening ? 'btn-recording' : 'btn-start'}`}
            onClick={startRecording}
            disabled={isListening}
          >
            {isListening ? '🔴 Recording...' : '🎤 Start Recording'}
          </button>
          <button
            className="keynotes-btn btn-stop"
            onClick={stopRecording}
            disabled={!isListening}
          >
            ⏹️ Stop Recording
          </button>
          <button
            className="keynotes-btn btn-clear"
            onClick={clearAll}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Status Display */}
      {statusMessage && (
        <div className={`keynotes-status ${statusType}`}>
          {statusMessage}
        </div>
      )}

      {/* Transcript Section */}
      <div className="keynotes-section">
        <h3>Speech Transcript</h3>
        <textarea
          className="keynotes-textarea transcript"
          value={transcript}
          placeholder="Your speech will appear here..."
          readOnly
          rows={6}
        />
      </div>

      {/* Generate Notes Section */}
      <div className="keynotes-section">
        <h3>Keynote Notes</h3>
        <button
          className="keynotes-btn btn-generate"
          onClick={generateNotes}
          disabled={isGenerating || !transcript.trim()}
        >
          {isGenerating ? '⏳ Generating Notes...' : '✨ Generate AI Notes'}
        </button>
        <textarea
          className="keynotes-textarea notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="AI-generated notes will appear here..."
          rows={12}
        />
      </div>

  
    </div>
  );
};

export default Keynotes;