import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';
import _ from "lodash";
var randomstring = require('randomstring');	// khai báo để sử dụng hàm randomstring

class App extends Component {
	// khai báo constructor có state chứa danh sách các task. Các thao tác thêm, xóa, sửa, cập nhật,
	// tìm kiếm sẽ thực hiện dứa trên state này
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],	// Chứa id:unique, name, status
			// Khai báo state này để có thể hiển thị form add-edit
			isDisplayForm: true,
			// State này để chứa thông tin của task được sửa, nó sẽ được hiển thị ở trên TaskForm
			taskEditing: null,
			filter:{
				name: "",
				status: -1
			},
			keyword:"",
			sortBy:"name",
			sortValue: 1
		}
	}
	// Sử dụng lifecycle: khi lưu dữ liệu thành công ở localStorage thì chúng ta cần gán nó cho state 
	// bằng cách sử dụng lifecycle. Hàm componentWillMount() sẽ được gọi khi F5 component và chỉ được
	// gọi duy nhất một lần. Có nghĩa là khi form đã xuất hiện rồi, thì componentWillMount() sẽ không
	// được gọi lại nữa.
	componentWillMount() {
		// Kiểm tra localStorage khác rỗng và kiểm tra xem nó đã lấy được dữ liệu của tasks hay chưa
		// Nên dùng 
		if (localStorage && localStorage.getItem("tasks")) {
			// Nếu ĐK đúng, khai báo tasks để hứng dữ liệu
			var tasks = JSON.parse(localStorage.getItem("tasks"));
			// Cập nhật lại state
			this.setState({
				tasks: tasks
			});
		}
	}
	onShowTaskForm = () => {
		// Thêm công việc
		if (this.state.isDisplayForm&& this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null
			});
		} else if(this.state.isDisplayForm===false){
			this.setState({ 
				isDisplayForm: true
			});
		}
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false
		});
	}
	onShowForm = () => {
		this.setState({
			isDisplayForm: true
		});
	}
	// Khai báo data để nhận được state vừa được truyền 
	onSubmit = (data) => {
		var { tasks } = this.state;	// arrow function
		if (data.id === "") {
			data.id = randomstring.generate(10);	// random id cho mỗi task khi được thêm
			tasks.push(data);
		}
		else {
			// Được dùng khi đang chỉnh sửa/cập nhật
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks: tasks,
			taskEditing: null
		});
		// Được dùng để lưu dữ liệu trên trình duyệt. Cụ thể là khi F5 hoặc tắt trình duyệt thì dữ 
		// liệu vẫn sẽ được lưu.

		// Nếu không dùng hàm JSON.stringify() thì khi sử dụng localStorage nó sẽ lưu dữ liệu dưới dạng
		// object. Chính vì thế việc sử dụng hàm này sẽ giúp dữ liệu ở dạng chuỗi.
		localStorage.setItem("tasks", JSON.stringify(tasks));	
	}
	onUpdateStatus = (id) => {
		// Tìm cái index theo id của nó
		//var index = this.findIndex(id);
		var { tasks } = this.state;
		// Thư viện Third-Party: Lodash

		// Các tham số: mảng muốn duyệt qua, một phần tử trong mảng, return về cái mà mình
		// muốn so sánh
		var index=_.findIndex(tasks,(task)=>{
			return task.id===id;
		});
		if (index !== -1) {
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks: tasks
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
		}
	}
	// Tìm index theo id của nó
	findIndex(id) {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if (task.id === id) {
				result = index;
			}
		});
		return result;
	}
	onDelete = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			// Xóa phần tử được chọn
			tasks.splice(index, 1);
			this.setState({
				tasks: tasks
			});
			localStorage.setItem("tasks", JSON.stringify(tasks));
			this.onCloseForm();
		}
	}
	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		// Gán cho taskEditing cái task thứ index và set lại state
		var taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing
		})
		this.onShowForm();

	}
	onFilter=(filterName, filterStatus)=>{
		// Bình thường nếu muốn chuyển từ chuỗi sang số ta cần phải parse với cú pháp:
		// filterStatus=parseInt(filterStatus, 10). Tuy nhiên chúng ta có thể làm một cách ngắn gọn hơn
		// là thêm dấu cộng trước giá trị là nó sẽ tự động chuyển, như phía dưới.
		filterStatus=+filterStatus;
		console.log(typeof filterStatus);
		this.setState({
			filter:{
				name: filterName.toLowerCase(),
				status: filterStatus
			}
		})
	}
	onSearch=(keyword)=>{
		this.setState({
			keyword:keyword.toLowerCase()
		})
	}
	onSort=(data)=>{
		this.setState({
			sortBy:data.sort.by,
			sortValue:data.sort.value
		},()=>console.log(this.state.sortBy+" "+this.state.sortValue));
	}
	// onSort=(sortBy, sortValue)=>{
	// 	console.log(sortBy+", "+sortValue);
	// 	this.setState({
	// 		sortBy: sortBy,
	// 		sortValue: sortValue
	// 	});
	// 	console.log(this.state.sortBy+" "+this.state.sortValue);
	// }
	render() {
		var { tasks, 
		isDisplayForm, 
		taskEditing, 
		filter, 
		keyword,
		sortBy,
		sortValue } = this.state;		// var tasks = this.state.tasks
		// Thuộc tính onTest của component TaskForm sẽ được truyền vào một hàm là onCloseForm




		if(filter){
			if(filter.name){
				// tasks=tasks.filter((task)=>{
				// 	// indexOf dùng để kiểm tra xem nó có chứa chuỗi filter.name hay không
				// 	// nếu bằng -1 có nghĩa là không tìm thấy
				// 	return task.name.toLowerCase().indexOf(filter.name)!==-1;
				// });
				// tasks=_.filter(tasks, (task)=>{
				// 	return task.name.toLowerCase().indexOf(filter.name)!==-1;
				// })
			}




			// Nếu dùng kiểu kiểm tra if(filter.status) thì nó sẽ kiểm tra !==null, 
			// !==undefind và !==0
			tasks=tasks.filter((task)=>{
				if(filter.status===-1){
					return task;
				}else{
					return task.status===(filter.status===1?true:false)
				}
			});
		}
		if(keyword){
			tasks=tasks.filter((task)=>{
				return task.name.toLowerCase().indexOf(keyword)!==-1
			});
		}
		if(sortBy==="name"){
			tasks.sort((a,b)=>{
				if (a.name>b.name) return sortValue;
				else if(a.name<b.name) return -sortValue;
				else return 0;
			})
		}else{
			tasks.sort((a,b)=>{
				if (a.status>b.status) return -sortValue;	// Sort tăng dần
				else if(a.status<b.status) return sortValue;
				else return 0;
			})
		}
		// Kiểm tra điều kiện nếu isDisplayForm = true thì sẽ đổ component TaskForm ra elmTaskForm
		var elmTaskForm = isDisplayForm ? <TaskForm
			// Khai báo một prop onSubmit để nhận giá trị từ component TaskForm và nhận lại một function
			// là onSubmit của component này
			onSubmit={this.onSubmit} 
			onTest={this.onCloseForm}
			task={taskEditing} /> : "";
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1><hr />
				</div>
				<div className="row">
					<div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
						{elmTaskForm}
					</div>
					<div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
						<button type="button"
							className="btn btn-primary"
							onClick={this.onShowTaskForm}>
							<span className="fa fa-plus mr-5"></span>Thêm Công Việc
						</button>&nbsp;
						{/*	tìm kiếm và sắp xếp	*/}
						<Control onSearch={this.onSearch}
						onSort={this.onSort}/>
						{/*list*/}
						<TaskList
						// Khai báo prop tasks cho component TaskList và truyền cho nó tasks trong
						// state của component này
						tasks={tasks} 
						onUpdateStatus={this.onUpdateStatus} 
						onDelete={this.onDelete}
						onUpdate={this.onUpdate} 
						onFilter={this.onFilter}/>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
