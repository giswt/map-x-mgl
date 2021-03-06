
\set admin `echo "$MAIL_ADMIN"`
\set guest `echo "$MAIL_GUEST"`

--
-- Data for Name: mx_config; Type: TABLE DATA; Schema: public; Owner: mapxw
--

COPY public.mx_config (pid, key, data, date_modified) FROM stdin;
1	about	[{"title": {"bn": "", "de": "", "en": "Disclaimer", "es": "", "fa": "", "fr": "Conditions d’utilisation", "ps": "", "ru": "", "zh": ""}, "content": {"bn": "", "de": "", "en": "", "es": "", "fa": "", "fr": "", "ps": "", "ru": "", "zh": ""}}]	now()
\.

--
-- Data for Name: mx_projects; Type: TABLE DATA; Schema: public; Owner: mapxw
--

COPY public.mx_projects (pid, id, id_old, title, description, active, public, admins, members, publishers, map_position, countries, creator, date_created, date_modified, views_external, alias, allow_join, contacts, states_views) FROM stdin;
1	MX-3ZK-82N-DY8-WU2-IGF	WLD	{"bn": "বিশ্", "de": "Welt", "en": "World", "es": "Mundo", "fa": "ﺞﻫﺎﻧ", "fr": "Monde", "ps": "نړۍ", "ru": "Мир", "zh": "世界"}	{"bn": "বিশ্", "de": "Welt", "en": "World", "es": "Mundo", "fa": "ﺞﻫﺎﻧ", "fr": "Monde", "ps": "نړۍ", "ru": "Мир", "zh": "世界"}	t	t	[1]	[1]	[1]	{"z": 2, "lat": 0, "lng": 0}	["WLD"]	1	now()	now()	[]	\N	f	[]	[] 
\.

--
-- Data for Name: mx_users; Type: TABLE DATA; Schema: public; Owner: mapxw
--

INSERT INTO
  public.mx_users (pid, id, username, email, key, validated, hidden, date_validated, date_last_visit, data)
VALUES
  (1, 1, 'user_1', :'admin', '3oqf43x3mbr1j78', 't', 'f', now(), now(), '{"user": {"cache": {"last_project": "MX-3ZK-82N-DY8-WU2-IGF", "last_language": "en"}}}'),
  (2, 2, 'user_2', :'guest', 'g8ejy73lqe7e8m6', 't', 'f', now(), now(), '{"user": {"cache": {"last_project": "MX-3ZK-82N-DY8-WU2-IGF", "last_language": "en"}}}');

