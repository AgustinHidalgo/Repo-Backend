import BasicMongo from "../BasicMongo.js";
import {ticketsModel} from '../../mongoDB/models/ticket.model.js'
import logger from "../../../Utils/winston.js";

class TicketsMongo extends BasicMongo {
  constructor(model) {
    super(model)
  }

  createTicket = async (ticket) => {
    
    try {
      const result = await this.model.create(ticket)
      logger.info(result)
      return result
    } catch (error) {
      return error
    }
  }
}

export default new TicketsMongo(ticketsModel);