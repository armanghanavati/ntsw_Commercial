import cub1 from './../assets/images/sw1.png'
import cub2 from './../assets/images/sw2.png'
const Loading = () => {
  return (
    <div className="loading">
      <span className="loading--cubes">
        <span className="loading--cube loading--cube-1"><img src={cub1} alt="لودینگ" /></span>
        <span className="loading--cube loading--cube-2"><img src={cub2} alt="لودینگ" /></span>
        <span className="loading--cube loading--cube-3"><img src={cub1} alt="لودینگ" /></span>
        <span className="loading--cube loading--cube-4"><img src={cub1} alt="لودینگ" /></span>
      </span>
      <h6 className="loading--text"><i className="fa fa-caret-left" aria-hidden="true"></i>
        لطفا منتظر بمانید...</h6>
    </div>
  );
}
export default Loading;
