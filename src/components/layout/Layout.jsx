import TopNav from './TopNav'

export default props => (
  <div className="min-h-screen bg-gray-100">
    <TopNav/>
    <main>
      <div className="py-2">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
)
