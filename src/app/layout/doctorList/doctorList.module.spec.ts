import { DoctorListModule } from './doctorList.module';

describe('TablesModule', () => {
  let doctorListModule: DoctorListModule;

  beforeEach(() => {
    doctorListModule = new DoctorListModule();
  });

  it('should create an instance', () => {
    expect(doctorListModule).toBeTruthy();
  });
});
