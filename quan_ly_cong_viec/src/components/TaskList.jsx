import React, { Component } from 'react';
import TaskItem from './TaskItem';
import '../App.css';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state={
            filterName: "",
            filterStatus: -1    // all: -1; active: 1; deactive: 0
        }
    }
    onChange=(event)=>{
        var target=event.target;
        var name= target.name;
        var value=target.value;
        // this.props.onFilter(name==="filterName"?value:this.state.filterName,
        // name==="filterStatus"?value:this.state.filterStatus)
        this.setState({
            [name]:value
        });
        // Dùng 1 trong hai cái phía dưới đều được, tuy nhiên nếu dùng cái ngắn hơn thì
        // khi log lại ko hiển thị được state đúng mặc dù coi state trong trình duyệt là
        // đùng. Chưa giải thích được tại sao

        this.props.onFilter(name==="filterName"?value:this.state.filterName,
        name==="filterStatus"?value:this.state.filterStatus);
        //this.props.onFilter(this.state);
    }
    render() {
        // Khai báo tasks để hứng dữ liệu từ phía component App qua prop tasks được khai
        // báo cho TaskList ở component đó

        // var {tasks}=this.props; // arrow function. Làm như này rồi thay thế ở (1) hoặc
        // không cần dòng này mà làm như ở (1)

        // Khai báo elements để chứa từng phần tử kèm index của nó thông qua việc dùng vòng
        // lặp map và trả về luôn component TaskItem(component sẽ chứa từng task). Trong 
        // TaskItem sẽ chứa key(vì là vòng lặp, và chọn id là duy nhất), và truyền giá trị
        // của từng task cho TaskItem bằng cách khai báo index, task để hứng giá trị
        var elements=this.props.tasks.map((task, index)=>{  // (1)
            return <TaskItem key={task.id} 
            index={index} 
            task={task}
            onUpdateStatus={this.props.onUpdateStatus}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}/>
        })
        return (
                <table className="table table-striped table-inverse table-responsive mt-15">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center pt-5">NA</td>
                            <td>
                                <input type="text" className="form-control" 
                                name="filterName" 
                                value={this.state.filterName}
                                onChange={this.onChange}/>
                            </td>
                            <td>
                                <select name="filterStatus" 
                                className="form-control"
                                value={this.state.filterStatus}
                                onChange={this.onChange}>
                                    <option value={-1}>Tất Cả</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={1}>Kích Hoạt</option>
                                </select>
                            </td>
                            <td className="text-center pt-5">NA</td>
                        </tr>
                        {elements}
                    </tbody>
                </table>
        )
    }
}
export default TaskList;