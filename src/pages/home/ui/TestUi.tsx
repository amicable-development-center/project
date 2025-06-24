import useProjectPageNation from "@entities/projects/hook/useProjectPageNation";
import useProjectList from "@entities/projects/queries/useProjectList";

const TestUi = () => {
  const { data: projects } = useProjectList();
  const { currentPage, handle } = useProjectPageNation({
    lastVisible: projects?.lastVisible || null,
  });

  console.log(projects);

  return (
    <div>
      <h2>현제 페이지: {currentPage}</h2>

      {projects?.projects.map((item, i) => {
        return <div key={i}>{item.id}</div>;
      })}
      <button onClick={handle.prev}>이전</button>
      <button onClick={handle.next}>다음</button>
    </div>
  );
};

export default TestUi;
