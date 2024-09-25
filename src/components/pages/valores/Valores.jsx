//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Valores = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Valores'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <section>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p></p>
          <ul>
            <li>Autoayuda</li>
            <li>Auto-responsabilidad</li>
            <li>Democracia</li>
            <li>Igualdad</li>
            <li>Equidad</li>
            <li>Solidaridad</li>
          </ul>
          <p></p>
        </div>
      </section>
    </div>
  );
};

export default Valores;