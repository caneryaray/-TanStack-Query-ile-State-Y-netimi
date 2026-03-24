import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data: contact, isLoading } = useQuery({
    queryKey: ['contact', contactId],
    queryFn: () => axios.get(`https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`).then(res => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', contactId] });
      history.push('/');
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  if (isLoading) return 'loading';

  if (!contact) return 'loading';

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
