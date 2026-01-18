export default function PracticePage() {
  const starters = [
    {
      name: 'Express Basic Server',
      path: '/practice/server-starters/express-basic',
      description: 'Simple Node.js Express server for LAN hosting',
      tags: ['Node.js', 'Express', 'Server'],
    },
    {
      name: 'Canvas Game (Vite + TypeScript)',
      path: '/practice/game-starters/canvas-vite-ts',
      description: 'Modern game development setup with hot reload',
      tags: ['Canvas', 'TypeScript', 'Vite'],
    },
    {
      name: 'WebSocket Multiplayer',
      path: '/practice/game-starters/websocket-multiplayer-basic',
      description: 'Real-time multiplayer with WebSockets',
      tags: ['WebSocket', 'Multiplayer', 'Node.js'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Practice Lab
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Starter templates and development environments for hands-on practice
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {starters.map((starter) => (
            <div key={starter.path} className="card">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {starter.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{starter.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {starter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm mb-4">
                {starter.path}
              </code>
              <a
                href={`https://github.com/yourusername/learning-platform/tree/main${starter.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>

        <div className="card mt-8">
          <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Clone the repository or download the starter template</li>
            <li>Navigate to the starter directory</li>
            <li>Run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm install</code></li>
            <li>Follow the README instructions in each starter</li>
            <li>Start building!</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
