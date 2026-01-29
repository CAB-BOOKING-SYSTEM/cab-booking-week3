import TypeDemo from "./TypeDemo";

function App() {
  return (
    <div>
      <h2>✅ Demo ĐÚNG</h2>
      <TypeDemo
        title="Product A"
        count={10}
        status="new"
      />
      {/* <h2>❌ Demo SAI</h2>
      <TypeDemo
        title={123}        
        count="ten"            
        status="hot"           
      /> */}
    </div>
  );
}

export default App;
