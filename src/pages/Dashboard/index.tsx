import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Container, EventTable, Form } from './style';

import { BsTrash } from 'react-icons/bs';
import { GrDislike, GrLike } from 'react-icons/gr';

interface EventoInterface {
  nomeevento: string;
  local: string;
  diasemana: string;
  periodo: string;
  horario: string;
  id: string;
  like?: number;
  dislike?: number;
}

const Dashboard: React.FC = () => {
  const [ListaEventosCadastrados, setListaEventosCadastrados] =
    useState<EventoInterface[]>();

  useEffect(() => {
    api.get(`/events`).then((response) => {
      setListaEventosCadastrados(response.data);
    });
  }, []);

  async function handleAddEvent(event: any) {
    event.preventDefault();

    const { target: form } = event;

    const novoCadastro = {
      nomeevento: form.nomeevento.value,
      local: form.local.value,
      diasemana: form.diasemana.value,
      horario: form.horario.value,
    };

    await api.post('events', novoCadastro);
    document.location.reload(true);

    form.reset();
  }

  async function deleteEvent(id: string) {
    await api.delete(`/events/${id}`);
    document.location.reload(true);
  }

  async function buttonLike(id: string) {
    await api.post(`/events/like/${id}`);

    document.location.reload(true);
  }

  async function buttonUnlike(id: string) {
    await api.post(`/events/dislike/${id}`);

    document.location.reload(true);
  }

  return (
    <Container>
      <Form onSubmit={handleAddEvent}>
        <input type="text" name="nomeevento" placeholder="Nome do Evento" />
        <input type="text" name="local" placeholder="Local do Evento" />
        <input type="text" name="diasemana" placeholder="Dia da Semana" />
        <input type="text" name="horario" placeholder="Horário" />
        <button type="submit">Salvar</button>
      </Form>

      <EventTable>
        <ul>
          {ListaEventosCadastrados
            ? ListaEventosCadastrados.map((ListaEventosCadastrados) => (
                <li key={ListaEventosCadastrados.nomeevento}>
                  <span>Nome evento: {ListaEventosCadastrados.nomeevento}</span>
                  <span>Local: {ListaEventosCadastrados.local}</span>
                  <span>
                    Dia da Semana: {ListaEventosCadastrados.diasemana}
                  </span>
                  <span>Horario: {ListaEventosCadastrados.horario}</span>

                  <div>
                    <button
                      onClick={() => {
                        buttonLike(ListaEventosCadastrados.id);
                      }}
                    >
                      <GrLike />
                    </button>
                    <h1>
                      {ListaEventosCadastrados.like
                        ? ListaEventosCadastrados.like
                        : '0'}
                    </h1>

                    <button
                      onClick={() => {
                        buttonUnlike(ListaEventosCadastrados.id);
                      }}
                    >
                      <GrDislike />
                    </button>
                    <h1>
                      {ListaEventosCadastrados.dislike
                        ? ListaEventosCadastrados.dislike
                        : '0'}
                    </h1>

                    <button
                      onClick={() => {
                        deleteEvent(ListaEventosCadastrados.id);
                      }}
                    >
                      <BsTrash />
                    </button>
                  </div>
                </li>
              ))
            : ''}
        </ul>
      </EventTable>
    </Container>
  );
};

export default Dashboard;
