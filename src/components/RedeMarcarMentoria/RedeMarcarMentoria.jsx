import React, { useState } from 'react';
import { string, func, bool } from 'prop-types';
import { Dialog } from '@material-ui/core';
import './RedeMarcarMentoria.css';
import plus from '../../assets/plus.png';
import RedeTextArea from '../RedeTextArea/RedeTextArea';
import RedeButton from '../RedeButton/RedeButton';

const RedeMarcarMentoria = ({
  image, title, userImage, userName, date, hour, mentoringOption, onConfirm, opened, onClose,
  // descricao, onClick, desabilitado, cancelar, claro, loading,
}) => {
  const [descricao, setDescricao] = useState('');
  const [typeMentoring, setTypeMentoring] = useState('');
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setDescricao('');
      setTypeMentoring('');
    }, 400);
  };

  const confirm = () => {
    handleClose();
    onConfirm({
      typeMentoring,
      descProject: descricao,
      date,
      hour,
    });
  };

  return (
    <Dialog open={opened} onClose={handleClose} className="rede-marcar-mentoria">
      <div className="content">
        <button type="button" className="close-icon" onClick={handleClose}>
          <img src={plus} alt="fechar" />
        </button>
        <div className="bloco info">
          <div className="foto-mentoria">
            <img src={image} alt="mentoria" />
          </div>
          <div className="informacao">
            <div className="titulo">
              {title}
            </div>
            <div className="mentor">
              <div className="mentor-foto">
                <img src={userImage} alt={userName} />
              </div>
              <div className="mentor-nome">{userName}</div>
            </div>
            <div className="data-hora">
              <div className="data">{date}</div>
              <div className="traco">-</div>
              <div className="hora">{hour}</div>
            </div>
          </div>
        </div>
        <div className="subtitulo">Descrição resumida do projeto:</div>
        <div className="bloco descricao">
          <RedeTextArea
            valor={descricao}
            onChange={(evt) => setDescricao(evt.target.value)}
          />
        </div>
        <div className="radios">
          {mentoringOption.map((each) => (
            <>
              <label htmlFor={each}>
                <input type="radio" name="tipo" id={each} value={each} onChange={(event) => setTypeMentoring(event.target.value)} />
                {each}
              </label>
            </>
          ))}
        </div>
        <div className="botao">
          <RedeButton
            descricao="MARCAR MENTORIA"
            onClick={confirm}
            desabilitado={!typeMentoring || !descricao}
          />
        </div>

      </div>
    </Dialog>
  );
};

RedeMarcarMentoria.propTypes = {
  opened: bool.isRequired,
  onClose: func.isRequired,
  image: string,
  title: string,
  userImage: string,
  userName: string,
  date: string,
  hour: string,
  onConfirm: func,
};

RedeMarcarMentoria.defaultProps = {
  image: '',
  title: '',
  userImage: '',
  userName: '',
  date: '',
  hour: '',
  onConfirm: () => { },
};

export default RedeMarcarMentoria;

// <Button
//   onClick={onClick}
//   disabled={desabilitado || loading}
//   cancelar={cancelar}
//   claro={claro}
//   loading={loading}
// >
//   {loading && (
//   <>
//     <RefreshIcon />
//   </>
//   )}
//   {descricao}
// </Button>
