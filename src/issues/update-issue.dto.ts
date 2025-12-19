import { IsOptional, IsString } from 'class-validator';

export class UpdateIssueDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
