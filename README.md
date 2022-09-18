# MusicHub

<p align="center">
  <img src="https://user-images.githubusercontent.com/72170805/188336584-800c548f-9015-4d0d-bf61-b6cab4e50b7f.png">
</p>

O MusicHub é uma aplicação que utiliza da API do Spotify para gerar recomendações e playlists personalizadas para o usuário. Além disso, ele é capaz de gerar dados interessantes sobre as músicas ouvidas.

## Como rodar o projeto
1. Inicie o Backend em uma janela do terminal

    ```sh
    $ cd backend
    $ python3 -m venv env
    $ source env/bin/activate
    (env)$ pip install -r requirements.txt
    (env)$ python main.py
    ```

    Entre em [http://localhost:8000](http://localhost:8000)

2. Inicie o Frontend em outra janela de terminal

    ```sh
    $ cd frontend
    $ npm install
    $ npm run start
    ```

    Entre em [http://localhost:3000](http://localhost:3000)

## Features
- Login/Cadastro
- Dados de destaque para o usuário
- Criar playlists randomizadas com artistas selecionados pelo usuário
- Criar playlists com músicas remixadas baseadas em playlists já feita pelo usuário

## Membros
- Caio Henrique Dias Rocha - Fullstack
- Henrique Soares Assumpção e Silva - Back-end
- Ivan Gomes - Front-end
- Renato Silva Santos - Fullstack

## Tecnologias
- React
- Django
- PostgreSQL

## Backlog da Sprint



### Histórias de usuário
- **Login**

	- Como usuário, eu quero conseguir conectar meu Spotify na plataforma, para que o site possa acessar meus dados únicos.
		- Criar a interface da tela de login, com o botão para autenticar com Spotify (Ivan Gomes)
		- Criar integração com a API do Spotify para gerar ponte de acesso a dados (Renato Silva Santos)

- **Destaque**
	- Como usuário, eu quero poder ver estatistícas interessantes (como Top Artistas, Bandas e Músicas) para que eu possa ter um feedback útil de meu Spotify
		- Acessar pela API do Spotify os dados do usuário referentes a bandas, músicas e artistas mais ouvidos (Renato Silva Santos)
		- Planejar telas dos dados dos usuários (Ivan Gomes)
		- Implementar as telas (Caio Henrique Dias Rocha)

- **Playlists**
	- Eu como usuário, quero poder criar playlists baseadas em artistas que eu selecionar, para que eu consiga montar automaticamente novas playlists de forma controlada e que se encaixam com meus gostos
		- Desenvolver e implementar a interface de criação de playlist, com a possibilidade de selecionar os artistas e uma área onde será disponibilizado um link com a playlist gerada (Caio Henrique Dias Rocha)
		- A partir dos artistas selecionados pelo usuário, selecionar músicas recomendadas e gerar uma playlist na conta do usuário (Henrique Soares Assumpção e Silva)

	- Eu como usuário, quero poder criar playlists baseadas em minhas playlists anteriores, para que eu consiga montar automaticamente novas playlists que me surpreendam e que ainda se encaixem com meus gostos
		- Desenvolver e implementar a interface. Deve haver uma grid ou lista com todas as playlists do usuário e a possibilidade de selecionar um número N de playlists. (Caio Henrique Dias Rocha)
		- Também deve haver uma área onde o usuário irá inserir um número X de músicas que a playlist final terá (Ivan Gomes)
		- A partir das playlists selecionadas pelo usuário, unir X músicas aleatórias destas e criar uma nova playlist para o usuário. (Henrique Soares Assumpção e Silva)
