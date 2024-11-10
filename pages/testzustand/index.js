import { useStore } from './store';

export default function Home() {
    console.log(useStore);
  const { count, increment, reset } = useStore();

  return (
    <div>
        <center>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Tambah</button>
      <button onClick={reset}>Reset</button>
      </center>
    </div>
  );
}