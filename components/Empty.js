const Empty = () => {
  return (
    <div className="empty">
      Ooops! No se encontraron elementos 😕
      <style jsx>
        {`
          .empty {
            padding: 2em 0;
            font-size: 0.9em;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Empty;
