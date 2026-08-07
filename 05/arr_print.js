const arr = [10, 20, 30, 40, 50];

let st_index = 0;

const printNumber = () => {
  if (st_index < arr.length) {
    console.log(arr[st_index]);
    st_index++;
    setTimeout(printNumber, 1000);
  }
};

printNumber();
