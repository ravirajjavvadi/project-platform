export default function ProjectCard({ title, type }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{type}</p>
    </div>
  );
}
