import type { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { surveys } from '@/db/schema.js';
import type { Survey } from '@/models/index.js';

export interface ISurveyRepository {
  save(survey: Survey<any>): Promise<void>;
}

export class PostgreSurveyRepository implements ISurveyRepository {
  constructor(private db: NeonHttpDatabase) {}

  async save(survey: Survey<any>): Promise<void> {
    await this.db.insert(surveys).values({
      id: survey.id,
      source: survey.source,
      sourceUrl: survey.sourceUrl,
      content: survey.content,
      data: survey.data,
      createdAt: survey.createdAt,
      updatedAt: survey.updatedAt
    });
  }
}
