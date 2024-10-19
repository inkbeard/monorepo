<script setup lang="ts">
  const contactInfo = [
    {
      icon: 'envelope',
      text: 'aaron@inkbeard.com',
      link: true,
    },
    {
      icon: 'location-dot',
      text: 'Chicago/Remote',
    },
  ];
  const experience = [
    {
      company: 'ThreeFlow',
      title: 'Sr Software Engineer / Engineering Team Lead',
      dates: 'Jun 2019 - November 2023',
      description: [
        /* eslint-disable vue/max-len */
        'Used scrum methodology to lead a team consisting of product, design, QA, backend, and frontend engineers to help define a product roadmap and deliver features on a regular basis.',
        'Built tooling to allow for migration of the company\'s vue2 component library to a vue3 monorepo.',
        'Built tooling to reduce the the time of component/unit-test creation from 2-3 hours to less than 1 minute.',
        'Built custom vue3 application similar to storybook/histoire and tooling for creating component examples pulling from JSdocs documentation.',
        'Helped established frontend standards and best practices for large scale applications through mentor-ship, unit/component/e2e testing and PR reviews.',
        'Implemented CI/CD pipelines for Vue frontend applications by writing custom circleCi orb and mergify rules for rapid development, PR managements, and deployment of features/bug fixes.',
        'Integrated jira, github, and circleCI automation to help streamline development, QA, and deployment processes.',
        'Increased unit test coverage (jest/vitest) from 40% to 80+% for largest application at the company.',
        'Built custom components used by multiple large scale applications.',
        /* eslint-enable vue/max-len */
      ],
    },
    {
      company: 'Veriflow',
      title: 'Frontend Engineer',
      dates: 'July 2016 - April 2019',
      description: [
        'Migrated a large scale application from Backbone.js to VueJs to improve performance and maintainability.',
        // eslint-disable-next-line vue/max-len
        'Used D3 to build a complex visualization map of large data sets to help users navigate network devices and potential points of security breaches.',
        'Built custom diff tool to help users compare changes between two versions of a network device configuration.',
        'A presentation of the entire application can be found on https://www.youtube.com/watch?v=I6dYiv02ddE',
      ],
    },
    {
      company: 'Gogo',
      title: 'Sr Frontend Engineer',
      dates: 'Nov 2014 - July 2016',
      description: [
        /* eslint-disable vue/max-len */
        'Lead developer for multi-year/multi-phased project, which included combining high trafficked b2b, b2c, and numerous marketing legacy projects into a single gogoair.com site.',
        'Created scss and markup standards guide to be followed by team.',
        'Updated a java based tech stack into more up to date technologies (at the time) including Handlebars.js, NGINX, scss, and Grunt.',
        'Worked closely with DevOps team to implement a build process utilizing automatic deployments to AWS instances based on triggers from gitlab changes.',
        /* eslint-enable vue/max-len */
      ],
    },
    {
      company: 'Razorfish',
      title: 'Sr Presentation Layer Engineer (Contract)',
      dates: 'July 2013 - July 2014',
      description: [
        'Worked with team of engineers for a social media application for a Motorola based on Backbone.js.',
        'Establish css standards for mobile and web version of 1-800-contacts.',
      ],
    },
    {
      company: 'Designkitchen',
      title: 'Frontend engineer',
      dates: 'June 2011 - July 2012',
      description: [
        'Frontend development of small and large scale web sites.',
        'Frontend implementation of Ruby on Rails application.',
        'Introduced processes for generating static HTML template for client hand-offs.',
      ],
      clients: [
        'Regal Cinemas',
        'Mercer',
        'Meijer',
        'Harley Davidson',
        'I Love NY',
        'Black & Decker',
        'Genentech',
      ],
    },
    {
      company: 'Band Digital, Inc',
      title: 'Software engineer',
      dates: 'June 2010 - June 2011',
      description: [
        'Built frontend code for sitefinity and sharepoint backed websites.',
      ],
      clients: [
        'Regal Cinemas',
        'Mercer',
        'Meijer',
        'Harley Davidson',
        'I Love NY',
        'Black & Decker',
        'Genentech',
      ],
    },
    {
      company: 'inkbeard',
      title: 'Independent contractor',
      dates: 'establish May 2008',
      clients: [
        'Accenture',
        'We Are Mammoth',
        'Lipman Hearne',
        'doxo',
        'W.W.Norton Publishing',
        'Texas Department of State Health Services',
        'Trademark Media',
      ],
    },
  ];
</script>

<template>
  <header>
    <div>
      <h2>Aaron Stoddart</h2>
      <p>Frontend Engineer</p>
    </div>
    <ul class="fa-ul">
      <li
        v-for="({ icon, link, text }) in contactInfo"
        :key="icon"
      >
        <span class="fa-li">
          <i
            class="fa-solid fa-lg"
            :class="`fa-${icon}`"
          />
        </span>
        <a
          v-if="link"
          :href="`mailto:${text}`"
        >
          {{ text }}
        </a>
        <template v-else>
          {{ text }}
        </template>
      </li>
    </ul>
  </header>
  <section>
    <h3>About Me</h3>
    <div>
      <p>
        <!-- eslint-disable-next-line vue/max-len -->
        I am currently a freelance Frontend engineer with 15+ years of experience. Working with small startups (10 employees) to large companies (1000+ employees) has provided me with a wide range of opportunities of growth and allowed me to make impactful company-wide decisions to build web applications from the ground up, establish best practices, and grow sets of skills from interacting with various aspects of each organization (devOps, product, QA, etc). I'm humbled to have worked with some of the best engineers and diverse people for as long as I have to build products for hundreds of thousands of users.
      </p>
    </div>
  </section>
  <section>
    <h3>Experience</h3>
    <div>
      <div
        v-for="({
          clients,
          dates,
          description,
          company,
          title,
        }) in experience"
        :key="company"
        class="experience-item"
        open
      >
        <h4>{{ company }} {{ dates }}</h4>
        <h5>{{ title }}</h5>
        <ul>
          <li
            v-for="(item, index) in description"
            :key="index"
          >
            {{ item }}
          </li>
          <li v-if="clients?.length">
            Clients including:
            <ul>
              <li
                v-for="(client, index) in clients"
                :key="index"
              >
                {{ client }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section>
    <p>References available upon request</p>
  </section>
</template>

<style scoped>
p,
li {
  text-wrap: pretty;
}

header {
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (width >= 768px) {
    flex-direction: row;
    margin: 40px 0;
  }

  div,
  ul {
    padding: 0 20px;

    @media (width >= 768px) {
      flex: 1;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 30px 20px;

    @media (width >= 768px) {
      align-items: flex-end;
    }
  }

  li {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
}

section {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 30px;
  padding: 0 30px 30px;
  border-bottom: 3px solid var(--accent-color);

  @media (width >= 768px) {
    flex-direction: row;
  }

  > * {
    flex: 3;

    &:last-child {
      flex: 9;
    }
  }

  &:last-child {
    border-bottom: none;

    > div {
      flex: 1;
    }
  }
}

.experience-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dashed var(--accent-color);

  &:last-child {
    border-bottom: none;
  }
}
</style>
