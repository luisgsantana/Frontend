import React from 'react';
import { useSnackbar } from 'notistack';
import Container from './StyledComponents';
import Hours from './StyledComponents/Hours';
import Label from './StyledComponents/Label';
import Details from './StyledComponents/Details';
import { urlFiles } from '../../services/http';
import RedeHorarioButton from '../RedeHorarioButton/RedeHorarioButton';
import RedeMarcarMentoria from '../RedeMarcarMentoria/RedeMarcarMentoria';
import { marcarMentoria } from '../../services/mentoria';

function RedeHorarioCard({ mentoria }) {
  const [open, setOpen] = React.useState(false);
  const [timeInfo, setTimeInfo] = React.useState('');
  const [dateInfo, setDateInfo] = React.useState('');

  const { enqueueSnackbar } = useSnackbar();


  const enqueue = (msg = '', variant = 'error', autoHideDuration = 2500) => {
    enqueueSnackbar(msg, { variant, autoHideDuration });
  };

  const { dateTime } = mentoria;
  const sortedTimes = dateTime.sort((dateTimeA, dateTimeB) => dateTimeA.dayOfTheMonth.split('/')[0] - dateTimeB.dayOfTheMonth.split('/')[0])
    .sort((dateTimeA, dateTimeB) => dateTimeA.dayOfTheMonth.split('/')[1] - dateTimeB.dayOfTheMonth.split('/')[1]);

  const timeInformation = sortedTimes.map((dt) => {
    // Quebra o dia onde tiver a string /, e tira os espaços em branco
    let dayOfTheMonth = dt.dayOfTheMonth.replace(/ /g, '').split('/');
    // Loop dentro da data, se encontrar algum numero com tamanho 1, significa que precisa colocar o 0
    // Por ex, mês 8 tem tamanho 1, precisa ficar 08
    for (let i = 0; i < 2; i += 1) if (dayOfTheMonth[i].length === 1) dayOfTheMonth[i] = `0${dayOfTheMonth[i]}`;
    // Junta o array, separando por /
    dayOfTheMonth = dayOfTheMonth.join('/');

    // eslint-disable-next-line max-len
    const hours = dt.times.map((time) => (
      <RedeHorarioButton
        desabilitado={time.flagBusy}
        ocupado={time.flagBusy}
        horario={time.hour}
        onClick={() => {
          setTimeInfo(time.hour);
          setDateInfo(dt.dayOfTheMonth);
          setOpen(true);
        }}
      />
    ));

    return (
      <Details>
        <Label>{dayOfTheMonth}</Label>
        <Hours>
          {hours}
        </Hours>
      </Details>
    );
  });

  function onConfirm(data) {
    const token = sessionStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    marcarMentoria(headers, { idMentoria: mentoria.idMentoria, choice: data })
      .then((res) => (
        res.status === 200
          ? enqueue('Mentoria cadastrada com sucesso', 'success')
          : console.log('Falha ao marcar mentoria. Código: ', res.status)))
      .catch((err) => {
        enqueue('Erro ao marcar mentoria');
        console.error(err);
      });
  }

  return (
    <Container>
      <>
        <RedeMarcarMentoria
          opened={open}
          image={`${urlFiles}/${mentoria.image}`}
          title={mentoria.title}
          userName={mentoria.mentorInfos.name}
          userImage={`${urlFiles}/${mentoria.mentorInfos.image}`}
          date={dateInfo}
          hour={timeInfo}
          onClose={() => setOpen(false)}
          onConfirm={(evt) => onConfirm(evt)}
        />
      </>
      <Details style={{ borderBottom: 'none', marginBottom: '15px', paddingTop: '10px' }}>
        <Label>Datas</Label>
        <Label style={{ width: '30%' }}>Horários</Label>
      </Details>
      {timeInformation}
    </Container>
  );
}

export default RedeHorarioCard;
