import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {


    return this.appService.getHello();
  }
}
/**
 *     let db = new Database('./data/sws.sqlite3', OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('sws.sqlite3');
    });
 * 
 *   {
    sql: 'CREATE TABLE swsCompany\r\n' +
      '(\r\n' +
      '\tid uniqueidentifier not null\r\n' +
      '\t\tprimary key,\r\n' +
      '\tname nvarchar(255) not null,\r\n' +
      '\tticker_symbol nvarchar(255),\r\n' +
      '\texchange_symbol nvarchar(255),\r\n' +
      '\tunique_symbol nvarchar(255),\r\n' +
      '\tdate_generated datetime2(6),\r\n' +
      '\tsecurity_name nvarchar(255),\r\n' +
      '\texchange_country_iso nvarchar(255),\r\n' +
      '\tlisting_currency_iso nvarchar(255),\r\n' +
      '\tcanonical_url nvarchar(255),\r\n' +
      '\tunique_symbol_slug nvarchar(255)\r\n' +
      ', score_id INTEGER REFERENCES swsCompanyScore(id))'
  },
  {
    sql: 'CREATE TABLE swsCompanyPriceClose\r\n' +
      '(\r\n' +
      '\tdate date not null,\r\n' +
      '\tcompany_id uniqueidentifier not null,\r\n' +
      '\tprice float not null,\r\n' +
      '\tdate_created datetime2 default CURRENT_TIMESTAMP not null,\r\n' +
      '\tprimary key (date, company_id),\r\n' +
      '    FOREIGN KEY (company_id) REFERENCES swsCompany(id)\r\n' +
      ')'
  },
  {
    sql: 'CREATE TABLE swsCompanyScore\r\n' +
      '(\r\n' +
      '\tid int identity\r\n' +
      '\t\tprimary key,\r\n' +
      '\tcompany_id uniqueidentifier not null,\r\n' +
      '\tdate_generated datetime2(6) not null,\r\n' +
      '\tdividend int not null,\r\n' +
      '\tfuture int not null,\r\n' +
      '\thealth int not null,\r\n' +
      '\tmanagement int not null,\r\n' +
      '\tpast int not null,\r\n' +
      '\tvalue int not null,\r\n' +
      '\tmisc int not null,\r\n' +
      '\ttotal int not null,\r\n' +
      '\tsentence nvarchar(255),\r\n' +
      '    FOREIGN KEY (company_id) REFERENCES swsCompany(id)\r\n' +
      ')'
  }
*/