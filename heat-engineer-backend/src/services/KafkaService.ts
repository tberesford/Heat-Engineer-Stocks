import { Kafka, Partitioners } from "kafkajs";

let kafka: Kafka;

const Broker = () => {
    if(!kafka){
        kafka = new Kafka({
            clientId: "heat-stock-app",
            brokers: ["localhost:9092"]
        })
    }
    return kafka;
}

const StockProducer = (kafka: Kafka) => {
    // Producer to emit messages to broker
    try{
        const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner});
        return producer;
    } catch (error) {
        throw new Error("Could not connect to broker");
    }
}

const StockConsumer = (kafka: Kafka) => {
    // Consumer subscribed to topic
    const consumer = kafka.consumer( {groupId: "test-group"} );
    consumer.subscribe({topic: "first_topic", fromBeginning: true});
    return consumer;
}

export { Broker, StockProducer, StockConsumer };