import { Routes, Route, Link } from 'react-router-dom';

const routes = [
  {
    pathName: 'Audio',
    path: '/audio',
  },
  {
    pathName: 'Video',
    path: '/video',
  },
];

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <div className="flex flex-col p-4">
        <header className="mb-4">
          <Link to="/"><h1 className="text-3xl sm:text-5xl font-semibold p-2 mb-3 w-min whitespace-nowrap bg-blue-300 rounded-sm">Offline Tools</h1></Link>
          <h2 className="text-2xl font-normal mb-2">Convert and edit media files and more on the fly!</h2>
          <h3 className="text-lg font-light">
            This is a
            {' '}
            <a className="text-blue-400 font-semibold" href="https://web.dev/what-are-pwas/" target="_blank" rel="noreferrer">PWA</a>
            {' '}
            (Progressive Web App), so you can install
            and even use it without an internet connection,
            hence all the processing is done locally.
          </h3>
        </header>

        <Routes>
          <Route path="/" />
          {
            routes.map((route) => <Route path={route.path} element={<h1>{route.pathName}</h1>} />)
          }
        </Routes>

        <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-4 text-center">
          {
            routes.map((route) => <Link to={route.path} className="border-gray-600 border-2 m-1 p-2 hover:border-white hover:bg-blue-400 hover:text-white rounded-sm transition-colors duration-150">{route.pathName}</Link>)
          }
        </section>
      </div>
      <footer className="mt-auto bg-gray-800 text-white p-4">
        Created by Jimmy Wang
      </footer>
    </div>
  );
}

export default App;
