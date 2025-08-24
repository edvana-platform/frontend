import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error?: string;
  onRetry?: () => void;
}

export default function ErrorBoundary({ 
  error = "Something went wrong in the School Admin dashboard", 
  onRetry 
}: ErrorBoundaryProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#FF715B]/20 to-[#FF715B]/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-[#FF715B]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-700 mb-6">
            {error}
          </p>
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="rounded-2xl shadow-xl"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}