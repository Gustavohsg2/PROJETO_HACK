const { MongoClient, ObjectId } = require("mongodb");

class Banco {
    static URI = process.env.TOKEN_MONGO;

    static DB = "Doações";
    static CLIENT = null;
    static async conectar() {
        if (!Banco.CLIENT) {
            try {
                Banco.CLIENT = new MongoClient(Banco.URI);
                await Banco.CLIENT.connect();
            } catch (err) {
                console.error("Erro:", err.message);
                process.exit(1);
            }
        }
        return Banco.CLIENT.db(Banco.DB);
    }

    static async fechar() {
        if (Banco.CLIENT) {
            await Banco.CLIENT.close();
            Banco.CLIENT = null;
        }
    }

    static async getCollection(nome) {
        const db = await Banco.conectar();
        return db.collection(nome);
    }

    static async insertOne(nome, dados) {
        const col = await Banco.getCollection(nome);
        return col.insertOne(dados);
    }

    static async findAll(nome, filtro = {}) {
        const col = await Banco.getCollection(nome);
        return col.find(filtro).toArray();
    }
    static async findOne(nome, filtro = {}) {
        const col = await Banco.getCollection(nome);
        console.log(col.findOne(filtro))
        return col.findOne(filtro);
    }

    static async updateOne(nome, id, status) {
        const col = await Banco.getCollection(nome);
        return col.updateOne({ paymentId: id },{ $set: { status: status } })
    };
}

module.exports = Banco;