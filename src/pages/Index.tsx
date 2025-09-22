// Welcome to Learnly - Your Personalized Learning Tracker

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dark">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Welcome to Learnly</h1>
        <p className="text-xl text-muted-foreground mb-8">Your personalized learning journey starts here!</p>
        <div className="flex gap-4 justify-center">
          <a href="/login" className="btn-maroon px-6 py-3 rounded-2xl font-medium">Get Started</a>
          <a href="/signup" className="btn-ghost-maroon px-6 py-3 rounded-2xl font-medium">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Index;
