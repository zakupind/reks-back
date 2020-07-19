export class GetHashesDto {
  nonce: number;
  clientSeed: string;
  serverSeedHashed: string;
  nextClientSeed: string;
  nextServerSeedHashed: string;
}
