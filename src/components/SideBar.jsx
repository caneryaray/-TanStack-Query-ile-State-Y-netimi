import axios from 'axios';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function SideBar() {
  const { data: contacts = [] } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => axios.get('https://65b36193770d43aba479a2f2.mockapi.io/users').then(res => res.data),
  });

  return (
    <div id="sidebar">
      <h1>WiTech Contacts</h1>
      <div>
        <Link to="/contacts/new">
          <button type="submit">New</button>
        </Link>
        <Link to="/">
          <button type="submit">Home</button>
        </Link>
      </div>
      <nav>
        {contacts.length ? (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <NavLink
                  to={`/contacts/${contact.id}`}
                  data-testid="contact"
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {contact.first_name || contact.last_name ? (
                    <>
                      {contact.first_name} {contact.last_name}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}{' '}
                  {contact.favorite && <span>★</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </div>
  );
}
