import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt, shapes } = await request.json();

    if (!shapes || !Array.isArray(shapes) || shapes.length === 0) {
      return NextResponse.json(
        { error: 'No shapes provided or invalid shapes data' },
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400 }
      );
    }

    // Format the shapes data for the OpenAI prompt
    const shapesDescription = shapes.map((shape, index) => {
      return `Shape ${index + 1}: Type: ${shape.type}, Position: (${shape.x}, ${shape.y}), Properties: ${JSON.stringify(shape.props)}`;
    }).join('\n');

    // Create the complete prompt for OpenAI
    const systemPrompt = `You are an AI assistant that helps improve and enhance drawings. 
    You will receive information about shapes in a drawing canvas, and you should return improved versions of these shapes.
    The improvements should respect the user's prompt and follow design best practices.
    
    Your response should be in JSON format with an array of enhanced shapes, maintaining each shape's ID.
    Example response format:
    {
      "enhancedShapes": [
        {
          "id": "shape1",
          "type": "geo",
          "props": { ... improved properties ... }
        }
      ]
    }
    
    Maintain all necessary properties and only modify what's needed to fulfill the user's request.`;

    const userPrompt = `Here are the shapes I want to enhance:
    
    ${shapesDescription}
    
    My enhancement request: ${prompt}
    
    Please improve these shapes according to my request. Return only the JSON with the enhanced shapes data.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    try {
      // Parse the JSON response
      const parsedResponse = JSON.parse(content);
      
      return NextResponse.json({
        enhancedShapes: parsedResponse.enhancedShapes
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in enhance-shapes API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
} 