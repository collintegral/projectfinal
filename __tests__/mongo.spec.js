const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();

describe('insert', () => {
    let connection;
    let database;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(process.env.MONGODB_URL)
      .then((client) => {
        database = client;
      })
    });

    afterAll(async () => {
        database.close();
    })
  
    test('should test GETALL character connection', async () => {
        const result = await database.db()
        .collection('characters')
        .find()
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GET character connection', async () => {
        const result = await database.db()
        .collection('characters')
        .find({name: "Training Knight"})
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GETALL inventory connection', async () => {
        const result = await database.db()
        .collection('inventory')
        .find()
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GET inventory connection', async () => {
        const result = await database.db()
        .collection('inventory')
        .find({name: "Practice Sword"})
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GETALL notes connection', async () => {
        const result = await database.db()
        .collection('notes')
        .find()
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GETPAST notes connection', async () => {
        const result = await database.db()
        .collection('notes')
        .find({past: true})
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GETPLAN notes connection', async () => {
        const result = await database.db()
        .collection('notes')
        .find({past: false})
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GETALL players connection', async () => {
        const result = await database.db()
        .collection('players')
        .find()
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });

    test('should test GET players connection', async () => {
        const playerId = new ObjectId("67f841c93180136af520cad0");
        const result = await database.db()
        .collection('players')
        .find({_id: true})
        .toArray();

        expect(result).toBeInstanceOf(Array);
    });
  });