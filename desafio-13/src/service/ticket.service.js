import TicketsMongo from "../persistence/DAOS/ticketsDAO/ticketsMongo..js";

class TicketsService {
    constructor(dao){
        this.dao = dao
    };

    createTicket= async (obj) => {
        const newTicket = await TicketsMongo.createTicket(obj)
        return newTicket
    };
    
    findOne = async (id) => {
        const findOne = await TicketsMongo.findOne(id)
        return findOne
    };

    findAll = async () => {
        const findAll = await TicketsMongo.findAll()
        return findAll
    };

    updateOne = async (id,obj) => {
        const updateOne = await TicketsMongo.updateOne(id,obj)
        return updateOne
    };

    deleteById = async(id) => {
        const findById = await TicketsMongo.deleteById(id)
        return findById
    };
}

export default new TicketsService(TicketsMongo)