
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';
import type { Greeting } from '../../server/src/schema';

function App() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadGreeting = useCallback(async () => {
    try {
      const result = await trpc.getBirthdayGreeting.query();
      setGreeting(result);
    } catch (error) {
      console.error('Failed to load birthday greeting:', error);
      // Fallback to static greeting when API fails
      setGreeting({
        message: "Happy Birthday",
        recipient: "Jasper Zesi",
        timestamp: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGreeting();
  }, [loadGreeting]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-xl text-purple-600">Loading...</div>
      </div>
    );
  }

  // This should never happen now since we have fallback, but keeping for safety
  if (!greeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Failed to load birthday greeting</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce delay-100">🎈</div>
        <div className="absolute top-20 right-20 text-5xl animate-bounce delay-300">🎉</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce delay-500">🎂</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce delay-700">🎁</div>
        
        {/* Main greeting card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-8xl">🌟</div>
            <div className="absolute top-8 right-8 text-6xl">✨</div>
            <div className="absolute bottom-4 left-8 text-7xl">🎊</div>
            <div className="absolute bottom-8 right-4 text-5xl">💫</div>
          </div>
          
          <CardContent className="p-12 text-center relative z-10">
            {/* Main message */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-4 animate-pulse">
                {greeting.message}! 🎉
              </h1>
              
              {/* Recipient name with special styling */}
              <div className="text-4xl md:text-5xl font-semibold text-purple-700 mb-6 relative">
                <span className="relative z-10">{greeting.recipient}</span>
                <div className="absolute inset-0 bg-yellow-200 transform rotate-1 rounded-lg opacity-30 -z-10"></div>
              </div>
            </div>
            
            {/* Celebratory message */}
            <div className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              <p className="mb-4">🌈 Wishing you a day filled with happiness 🌈</p>
              <p className="mb-4">🎂 And a year filled with joy! 🎂</p>
              <p>✨ Hope all your birthday wishes come true! ✨</p>
            </div>
            
            {/* Timestamp */}
            <div className="text-sm text-purple-600 opacity-75 mt-8">
              📅 {greeting.timestamp.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            {/* Decorative border */}
            <div className="mt-8 flex justify-center space-x-2">
              {Array.from({ length: 15 }, (_, i) => (
                <span key={i} className="text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                  {['🎈', '🎉', '🎂', '🎁', '⭐'][i % 5]}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute text-pink-400 text-2xl animate-bounce opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              💖
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
