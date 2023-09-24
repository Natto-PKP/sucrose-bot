import { ChatFunction } from '../FunctionService';

interface Params {
  name: string,
}

export default {
  execute: async ({ name }: Params) => {
    const response = await fetch(`https://api.npms.io/v2/search?q=${name}&size=1`);

    if (!response.ok) return JSON.stringify({ error: 'An error occured while fetching the package' });

    const json = await response.json();

    if (!json.total) return JSON.stringify({ error: 'No package found' });
    const { package: pkg } = json.results[0];

    return JSON.stringify({
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      keywords: pkg.keywords,
      links: pkg.links,
      date: pkg.date,
      author: pkg.author,
    });
  },

  data: {
    name: 'getNPMPackage',
    description: 'Get npm package information',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The package name to search for',
        },
      },
      required: ['name'],
    },
  },
} as ChatFunction;
