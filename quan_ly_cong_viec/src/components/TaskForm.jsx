import React, { Component } from 'react';
import '../App.css';

class TaskForm extends Component {
	constructor(props) {
		super(props);
		// Nhận các giá trị từ TaskForm
		this.state = {
			id: "",
			name: "",
			status: false
		}
	}
	componentWillMount() {
		if (this.props.task) {
			this.setState({
				id: this.props.task.id,
				name: this.props.task.name,
				status: this.props.task.status
			});
		}
	}
	// Được dùng để hiển thị dữ liệu ở lần click tiếp theo lên TaskForm
	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.task) {
			this.setState({
				id: nextProps.task.id,
				name: nextProps.task.name,
				status: nextProps.task.status
			});
		} else if (nextProps && nextProps.task === null) {
			this.setState({
				id: "",
				name: "",
				status: false
			})
		}
	}
	// Được gọi tới khi click vào cái icon đóng form. Khi được thực hiện, nó sẽ gọi đến
	// thuộc tính của chính component này là onTest. Và thuộc tính này chính là thuộc
	// tính được khai báo bên component App. Qua đó nào!
	onTest = () => {
		this.props.onTest();
	}
	// Vì TaskForm có chứa dữ liệu nên ta bắt sự kiện này
	onChange = (event) => {
		// Khai báo target bằng event.target(hướng nó đến từng giá trị của mỗi ô input)
		var target = event.target;
		// Khai báo name vì mỗi ô input sẽ có một cái name khác nhau
		var name = target.name;
		var value = target.value;
		// Chuyển từ string sang dạng boolean
		if (name === "status") {
			value = target.value === "true" ? true : false;
		}
		this.setState({
			[name]: value
		})
	}
	onSubmit = (event) => {
		// Kiểu mặc định của trình duyệt sẽ làm trnag bị load lại khi chúng ta ấn submit,
		// chúng sẽ sẽ áp dụng hàm dưới để chặn việc này
		event.preventDefault();
		// Truyền state ra ngoài
		this.props.onSubmit(this.state);
		// Huy bo va dong form
		this.onClear();
		this.onTest();
	}
	onClear = () => {
		this.setState({
			name: "",
			state: false
		})
	}
	render() {
		var { id } = this.state;
		return (
			<div className="panel panel-warning">
				<div className="panel-heading">
					<h3 className="panel-title">{id !== "" ? "Cập Nhật Công Việc" : "Thêm Công Việc"}<span className="fa fa-times-circle text-right"
						role="button" onClick={this.onTest}></span> </h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Tên:</label>
							<input type="text" className="form-control" name="name"
								value={this.state.name}
								onChange={this.onChange} />
						</div>
						<label>Trạng Thái: </label>
						<select name="status" className="form-control mb-5" value={this.state.status}
							onChange={this.onChange}>
							<option value={true}>Kích hoạt</option>
							<option value={false}>Ẩn</option>
						</select>
						<div className="text-center">
						<button type="submit" className="btn btn-primary"><span className="fa fa-plus mr-5"></span>Lưu Lại</button>&emsp;
						<button type="button" className="btn btn-danger" onClick={this.onClear}><span className="fa fa-times-circle mr-5"></span>Hủy Bỏ</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default TaskForm;
