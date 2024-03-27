export default function input({ id, error, name, ...props }) {
  return (
    <>
      <label htmlFor={id}>{name}</label>
      <input id={id} {...props} />
      <div className="control-error">
        <p>{error}</p>
      </div>
    </>
  )
}
