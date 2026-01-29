import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    // Use Gemini API (free tier)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    console.log('API Key exists:', !!GEMINI_API_KEY);

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Use gemini-1.5-flash (correct model name for free tier)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    console.log('Making request to Gemini API...');

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${context}\n\nUser message: ${message}\n\nRespond as Eranga Jayasooriya (in first person). Keep the response friendly, concise, and professional.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log('Gemini API Response Status:', response.status);
    console.log('Gemini API Response:', JSON.stringify(data, null, 2));

    // Check for HTTP errors
    if (!response.ok) {
      console.error('Gemini API HTTP Error:', response.status, data);
      return NextResponse.json(
        { 
          error: 'Failed to generate response', 
          details: data.error?.message || `HTTP ${response.status}`,
          status: response.status 
        },
        { status: response.status }
      );
    }

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return NextResponse.json(
        { error: 'Failed to generate response', details: data.error.message || data.error },
        { status: 500 }
      );
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I'm sorry, I couldn't generate a response. Please try again or contact me directly at jaderanga@gmail.com!";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
