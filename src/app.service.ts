import { Injectable } from '@nestjs/common';
import { Ruling } from './ruling/ruling.entity';
import { DataSource, In } from 'typeorm';
import { Category } from './category/category.entity';

type ResponseMFKN = {
  id: string;
  title: string;
  body: string;
  categories?: string[];
  published_date: string;
  type: string;
};

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
  async scrapeMFKN(): Promise<string> {
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
          statusText: result.statusText,
        });
        break;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await result.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const publications: ResponseMFKN[] = response.publications;
      const allCategories = await this.dataSource.manager.find(Category, {});
      const currentCategoriesNames = new Set(allCategories.map((cat) => cat.name));
      const newCategoriesToCreate = new Set();

      publications.forEach((publication) => {
        if (publication.categories) {
          publication.categories.forEach((cat) => {
            if (!currentCategoriesNames.has(cat)) {
              newCategoriesToCreate.add(cat);
            }
          });
        }
      });

      await this.dataSource.manager.save(
        Array.from(newCategoriesToCreate).map((cat: string) => {
          const category = new Category();
          category.name = cat;
          return category;
        }),
      );

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      publications.forEach(async (publication) => {
        if (
          !(await this.dataSource.manager.findOneBy(Ruling, {
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
    ruling.publishedAt = new Date(publication.published_date);

    ruling.categories = await this.dataSource.manager.find(Category, {
      where: {
        name: In(publication.categories ?? []),
      },
    });

    await this.dataSource.manager.save(ruling);
  }
}
