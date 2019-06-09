import React, { Component } from 'react';
import '../App.css';

class Sort extends Component {
    constructor(props){
        super(props);
        this.state={
            sort:{
                by:"name",
                value:1
            }
        }
    }
    // Vì setState() là một hàm bất đồng bộ(khi set một giá trị mới cho các
    // state và log ra thì có kết quả là giá trị của state, mặc dù khi check
    // thì state đã được lưu với giá trị mới). Chính vì vậy ta dùng một cái
    // hàm gọi lại như phía dưới, nó sẽ được thực hiện khi nào quá trình 
    // setState hoàn thành
    onClick=(sortBy, sortValue)=>{
        this.setState({
            sort:{
                by:sortBy,
                value: sortValue
            }
        },
        ()=>this.props.onSort(this.state));
    }
    render() {
        var {sort}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        id="dropdownMenu1"
                        aria-haspopup="true"
                        aria-expanded="true">
                        Sắp xếp <span className="fa fa-sort-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1" role="menu">
                        <li onClick={()=>this.onClick("name", 1)}>
                            <a className={(sort.by==="name"&&sort.value===1)?
                            "sort_selected":""} role="button">
                                <span className="fa fa-sort-alpha-down pr-5">

                                </span>
                                Tên A-Z
							</a>
                        </li>
                        <li onClick={()=>this.onClick("name", -1)}>
                            <a className={(sort.by==="name"&&sort.value===-1)?
                            "sort_selected":""} role="button">
                                <span className="fa fa-sort-alpha-up pr-5">

                                </span>
                                Tên Z-A
							</a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={()=>this.onClick("status", 1)}>
                            <a role="button"
                            className={(sort.by==="status"&&sort.value===1)?
                            "sort_selected":""}>Trạng Thái Kích Hoạt</a>
                        </li>
                        <li onClick={()=>this.onClick("status", -1)}>
                            <a role="button"
                            className={(sort.by==="status"&&sort.value===-1)?
                            "sort_selected":""}>Trạng Thái Ẩn</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sort;