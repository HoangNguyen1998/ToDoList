import React, { Component } from 'react';
import '../App.css';

class TaskItem extends Component {
    onUpdateStatus=()=>{
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete=()=>{
        this.props.onDelete(this.props.task.id);
    }
    onUpdate=()=>{
        this.props.onUpdate(this.props.task.id);
    }
    render() {
        // Khai báo task và index để hứng giá trị được truyền vào từ component TaskList
        var {task, index}=this.props;
        return (
                <tr>
                    <td className="text-center pt-5">{index}</td>
                    <td className="text-center pt-5">{task.name}</td>
                    <td className="text-center pt-5"><span className={task.status===true?"label label-success":"label label-danger"}
                    onClick={this.onUpdateStatus}>{task.status===true?"Kích Hoạt":"Ẩn"}</span></td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                            <i className="fas fa-pencil-alt mr-5"></i>Sửa
						</button>
                        &nbsp;
							<button type="button" className="btn btn-danger" onClick={this.onDelete}>
                            <i className="fas fa-trash-alt mr-5"></i>Xóa
							</button>
                    </td>
                </tr>
        )
    }
}

export default TaskItem;