import "./Search.css";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <div className="Search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search recipes ..."
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
