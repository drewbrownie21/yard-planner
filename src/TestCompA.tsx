type ToDoTypes = {
    id: string,
    task: string
}

const TODOS = [
    { id: "1", task: 'Do this' },
    { id: "2", task: 'Do that' },
  ];

const withNoData = (Component:any) => (props:any) => {
    // Can add edge case logic in the HOC
    if (!props.data) return <div>No data loaded yet.</div>;

    return <Component {...props}/>
}

const withEmptyData = (Component:any) => (props:any) => {
    // Can add edge case logic in the HOC
    if (!props.data.length) return <div>Data is empty.</div>;

    return <Component {...props}/>
}

function BaseToDoList({data}:{data:ToDoTypes[]}){
    return(
        <ul>
            {data.map((item:ToDoTypes, index:number) => (
                <div key={index}>
                    {item.id}: {item.task}
                </div>
            ))}
        </ul>
    )
}

// We can nest HOC by allowing functionality to be split into different HOC (simple example here obviously)
const Conversion = withNoData(withEmptyData(BaseToDoList))

export function TestCompA() {
    return (
      <div>
        <Conversion data={TODOS} />
      </div>
    );
  }
