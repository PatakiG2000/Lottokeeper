Live site: https://lottokeeperbygergopataki.netlify.app/

# Getting Started with Create React App

  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

  

## Available Scripts

  

### `npm start`

  

Runs the app in the development mode.\


  
 

### `npm run build`


  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

## Döntések

### Projekt Alapok

Az applikációhoz Reactet használtam, typescripttel, ami nagyban megkönnyíti a fejlesztési folyamatot, React frameworkok használatát nem éreztem indokoltnak. 

### Stílus 

A stílusért default CSS felel, amit az átláthatóság kedvéért külön fileokba helyeztem el. Nem a design volt az elsődlegesen fókuszban, de szerintem sikerült átláthatóvá tenni, és reszponzív is.

### Third party libraries

Két third-libraryt használ az applikáció, a React Framer Motiont, hogy legyen egy kis plusz az interfacen, illetve a nanoid-t, amely segít a lotto ticket és egy egyéb keyek generálásában.

### Global state management

State managementhez a React Contextet választottam, mert úgy gondoltam, hogy egy Redux például sok és felesleges lett volna, hiszen az applikációra nem jellemzőek a high-frequency changek, illetve ezen felül egyéb third party library használatát sem éreztem indokoltnak. 

### Randomizáció

Az applikációban, lévén, hogy nem éles összegek forognak kockán egy egyszerű Math.random() funkcióval generálom le az 5 számot, de mivel a generálás egy functionben történik mindig, így bármikor könnyen változtatható a randomizáció algoritmusa. 

### Nyeremények kiosztása

A ház minden egyes eladott jegy után kap profitot, ami nem kerül a prize poolba, majd a prize poolban felgyülemlett összeget, osztja el aszerint, hogy egyes találatok után mennyi a megszerezhető maximum összeg, majd azt az összeget továbbosztja a találatos szelvényeknek. Ezzel elkerülhető, hogy egy két találatos szelvény is elnyerje a főnyereményt, illetve megmarad a valódi lottósorsolások, azon logikája, hogy a találatokkal rendelkező szelvények osztoszkodnak. A nyereményalap képes növekedni, ezzel együtt nő az ötös találattal megnyerhető összeg is, ami szimulálni hivatott a valódi sorsolásokat. 

Az arányok elosztása pedig könnyen változtatható, mindössze a prizeControls.ts ben található változóban lehet az értékeket átírni. 



