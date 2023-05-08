import React from 'react';
import { useState } from "react";
import "./App.css";

function App() {
  let [title, setTitle] = useState([
    "남자코트 추천",
    "강남 우동맛집",
    "파이썬독학",
  ]);
  let [modal, setModal] = useState(false);
  let [indexNum, setIndexNum] = useState(0);
  const [text, setText] = useState("");
  let [newTitle, setNewTitle] = useState([]);
  let [todayYearState, setTodayYearState] = useState(2022);
  let [todayMonthState, setTodayMonthState] = useState(12);
  let [todayDateState, setTodayDateState] = useState(15);
  let [todayHourState, setTodayHourState] = useState(0);
  let [todayMinuteState, setTodayMinuteState] = useState(0);
  let [todaySecondState, setTodaySecondState] = useState(0);

  const handleDelete = (item) => {
    let filtered = title.filter((titleName) => titleName !== item);
    setTitle(filtered);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleNewList = () => {
    if (text === "") {
      return;
    }
    console.log("newTitle:", newTitle); // 처음에는 빈배열에다가 
    let copy = [...newTitle];         // copy 변수에 배열을 복사해주는데
    copy.push(text);                  // push로 변수에 text 입력값을 저장한다.
    setNewTitle(copy);                    
    
    console.log("newTitle:", newTitle); // 텍스트를 여러번 입력하면 ...newTitle 로 배열에 저장된 모든 아이들이 저장됨 
    setText("");

    let todayDateData = new Date();
    let todayYear = todayDateData.getFullYear();
    setTodayYearState(todayYear);
    let todayMonth = todayDateData.getMonth() + 1;
    setTodayMonthState(todayMonth);
    let todayDate = todayDateData.getDate();
    setTodayDateState(todayDate);
    let todayHour = todayDateData.getHours();
    setTodayHourState(todayHour);
    let todayMinute = todayDateData.getMinutes();
    setTodayMinuteState(todayMinute);
    let todaySecond = todayDateData.getSeconds();
    setTodaySecondState(todaySecond);
  };

  const changeTitle = () => {
    let copy = [...title];
    copy[0] = "여자코트 추천";
    setTitle(copy);
  };
  const changeSort = () => {
    let copy = [...title];
    copy.sort();
    setTitle(copy);
  };
  const changeSortReverse = () => {
    let copy = [...title];
    copy.sort(compStringReverse);
    setTitle(copy);
  };

  function compStringReverse(a, b) {
    if (a > b) return -1;
    if (b > a) return 1;
    return 0;
  }

  return (
    <div className='App'>
      <div className='nav'>
        <div>개발 vlog</div>
      </div>
      <div className='actionBtn'>
        <button onClick={changeTitle}>제목변경</button>
        <button onClick={changeSort}>가나다순정렬</button>
        <button onClick={changeSortReverse}>역순순정렬</button>
      </div>

      {title.map(function (item, i) {
        return (
          <div className='list' key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setIndexNum(i);
              }}>
              {item}
              <DDabbong key={i} />
            </h4>
            <p>2022-12-15 발행</p>
            <button onClick={() => handleDelete(item)}>삭제</button>
          </div>
        );
      })}
      {newTitle.map(function (item, i) {
        return (
          <div className='list' key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setIndexNum(i);
              }}>
              {item}
              <DDabbong key={i} />
            </h4>
            <p>
              {todayYearState}년{todayMonthState}월{todayDateState}일
              {todayHourState}시{todayMinuteState}분{todaySecondState}초 발행
            </p>
            <button onClick={() => handleDelete(item)}>삭제</button>
          </div>
        );
      })}

      <div className='input-area'>
        <input type='text' value={text} onChange={handleText} />
        <button onClick={handleNewList}>게시물생성</button>
      </div>

      {modal === true ? (
        <Modal title={title} indexNum={indexNum} setTitle={setTitle} />
      ) : null}

      <Modaal />
    </div>
  );
}

function DDabbong() {
  let [ddabong, setDDabong] = useState(0);
  return (
    <div>
      <span
        onClick={() => {
          setDDabong(ddabong + 1);
        }}>
        좋아용😊
      </span>
      {ddabong}
    </div>
  );
}

function Modal({ title, indexNum, setTitle }) {
  const handleModalTitle = () => {
    let copy = [...title];
    copy[0] = "여자코트 추천";
    setTitle(copy);
  };
  return (
    <div className='modal'>
      <h4>{title[indexNum]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button
        onClick={() => {
          handleModalTitle();
        }}>
        제목변경
      </button>
    </div>
  );
}

class Modaal extends React.Component {
  constructor(props){           // 예를들어 App컴포넌트에서 Modaal컴포넌트로 props를 보냈다고 했을때
    super(props);               // props는 constructor(props),super(props)로 왼쪽과 같이 전달된다.
    this.state = {
      name: 'kim',
      age: 20,
    }
  }
  render(){
    return (                    // return문 안에서 props는 {this.props}이렇게 사용하면 된다.
      <div>
        <div>안녕{this.state.name}{this.state.age}</div> 
        <button onClick={()=>{
          this.setState({age: 21})
        }}>버튼</button>
      </div>
    )
  }
}

export default App;
