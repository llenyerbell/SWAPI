Instrucciones:

1. Clonar el repositorio en su directorio de prefencia
    git clone https://github.com/llcheoll/api-crm.git

2. Instalar AWS Client en tu pc
    https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

3. Instalar AWS SAM CLI
    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

4. configurar una cuenta IAM
    https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users/details/dev?section=permissions

5. End Points
    listar Personajes de Star Wars
        https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/listPersonajes (GET)
    listar Planetas
        https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/listPlanetas (GET)
    fusionar Data
        https://hf33no971k.execute-api.us-east-1.amazonaws.com/Prod/personajesWithPlanetas (GET)

Notas: en la api fusionar data se está consirando la ubicación actual del personaje y las coordenadas del planeta para saber de cual planeta está mas cerca el personaje y a que distancia, adisional a ello se esta realizando una validación para saber si ya se ha fusionado esa información antes segun el personaje, (como mejora podría hacer que un servicio consumer obtenga la información de ubicación actualizada y actualizarla en la fusion ya creada en caso exista, agregando un log de movimientos relacionado para no perder el rastro o recorrido que ha tenido el personaje)

Implicitamente se ha hecho saber que cada vez que se llama a la api fusionar data se guarda esa fusión en una tabla 

Las tablas estan hechas en DynamoDB para el ejemplo se podría usar mysql para manejar una relación de movimientos relacionados a un personajes


Para administrar la configuracion de los servicios se le da click inzquierdo sobre el archivo .yml y te vas a la opcion "Open with infraestructure composer" 


De esta manera se simplifica mucho el levantamiento de un serveless

