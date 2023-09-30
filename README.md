# FlipCards
Tarjetas para aprender idiomas.

![image](https://github.com/nexus122/FlipCards/assets/22988550/9a57b189-8faa-47b9-95ef-986969ef3d42)


Ahora mismo esta configurado con algunas frases en italiano que le he pedido a Chat gpt con este prompt:
````
Siguiendo esta estructura:
 {
    "question": "Ciao, come stai?",
    "response": "Hola, ¿cómo estás?",
  },

Dame las 10 frases mas útiles para un turista en italiano
````
## Formato de datos
El resultado se pone en data.json y esto sirve para generar las tarjetas.
Los datos son:
- question -> frase en italiano
- response -> traducción de la frase

## Funcionamiento
Si se pulsa el titulo de la tarjeta te pronuncia el texto en italiano.
Si le das a el boton Flip se muestra el texto en español.

## Tecnologia
- Html
- CSS
- JS

## TODO
- [x] Que se pasen las tarjetas por gesto en lugar de por botones
- [ ] Que se marquen las tarjetas que ya ha hecho
