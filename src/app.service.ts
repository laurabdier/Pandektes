import { Injectable } from '@nestjs/common';
import { Ruling } from './ruling.entity';
import AppDataSource from './dataSource';

type ResponseMFKN = {
  id: string;
  title: string;
  body: string;
  categories: string[];
  published_date: string;
  type: string;
};

@Injectable()
export class AppService {
  async scrapMFKN(): Promise<string> {
    for (let skip = 0; ; skip += 1000) {
      const result = await fetch('https://mfkn.naevneneshus.dk/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categories: [],
          query: '',
          types: ['ruling'],
          skip,
          size: 1000,
        }),
      });

      if (!result.ok) {
        console.log('NOT OK', {
          status: result.status,
          content: await result.text(),
        });
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await result.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const publications: ResponseMFKN[] = response.publications;

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      publications.forEach(async (publication) => {
        if (
          !(await AppDataSource.manager.findOneBy(Ruling, {
            providerId: publication.id,
            providerSource: 'mfkn',
          }))
        ) {
          await this.saveMFKNRuling(publication);
        }
      });

      if (publications.length !== 1000) break;
    }

    return 'OK';
  }

  async saveMFKNRuling(publication: ResponseMFKN) {
    const ruling = new Ruling();
    ruling.title = publication.title;
    ruling.content = publication.body;
    ruling.providerId = publication.id;
    ruling.providerSource = 'mfkn';
    ruling.publicationDate = publication.published_date;

    await AppDataSource.manager.save(ruling);
  }
}
