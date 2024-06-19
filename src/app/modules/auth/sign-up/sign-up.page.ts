import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  emailSignup: any;
  passwordSignup: any;
  confirmPasswordSignup: any;
  myForm: any;
  formCheckSignUp: any;
  signupForm: FormGroup;
  validations: any;
  address: string | undefined;
  email: any;
  password: any;
  username: any;
  token: string | null = null;
  protectedData: any;
  phone: any;
  fullname: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.validations = {
      email: [
        { type: 'required', message: 'Email là bắt buộc' },
        { type: 'email', message: 'Email chưa đúng định dạng' },
      ],
      username: [
        { type: 'required', message: 'Username là bắt buộc' },
        { type: 'minlength', message: 'Tên người dùng ít nhất 7 ký tự' },
      ],
      phone: [
        { type: 'required', message: 'Phone là bắt buộc' },
        { type: 'minlength', message: 'Số điện thoại phải đủ 10 số' },
      ],
      password: [
        { type: 'required', message: 'Password là bắt buộc' },
        {
          type: 'minlength',
          message: 'Password ít nhất 10 ký tự',
        },
        {
          type: 'maxlength',
          message: 'Password nhiều nhất 20 ký tự',
        },
        {
          type: 'pattern',
          message: 'Mật khẩu phải chứa ít nhất 1 chữ thường, chữ in, số và ký tự (@$!%*?&)',
        },
      ],
      confirmPassword: [
        { type: 'required', message: 'Confirm password is required' },
      ],
      fullname: [
        { type: 'required', message: 'Bắt buộc nhập' },
      ],
      address: [{ type: 'required', message: 'Bắt buộc nhập' }],
    };
    this.signupForm = this.formBuilder.group(
      {
        email: ['@gmail.com', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(7)]],
        password: [
          '',
          Validators.compose([
            Validators.minLength(10),
            Validators.maxLength(20),
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*[@$!%*?&])(?=.*?[a-z])(?=.*?[0-9]).{10,20}$'
            ),
          ]),
        ],
        confirmPassword: ['', Validators.required],
        fullname: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        address: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { mismatch: true };
  }

  async signUp() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
    });
    await loading.present();
    const getInforUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      name: this.fullname,
    };
    this.userService.postUsers(getInforUser).subscribe(
      (res: any) => {
        loading.dismiss();
        this.router.navigate(['/home']);
        console.log('success', res);
      },
      (err: any) => {
        loading.dismiss();
        console.error('failed', err);
      }
    );
  }

  async btnRegister() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
    });
    await loading.present();
    this.userService.getUser(this.username, this.email).subscribe(
      async (useLoginName) => {
        console.log(useLoginName);
        let usernameCheck = useLoginName.usernameExists;
        let emailCheck = useLoginName.emailExists;
        this.returnMessageResponse(usernameCheck, emailCheck);
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
        console.error('Lỗi khi tìm kiếm người dùng', error);
      }
    );
  }

  returnMessageResponse(usernameCheck: boolean, emailCheck: boolean) {
    if (usernameCheck || emailCheck) {
      if (usernameCheck && emailCheck) {
        this.checkUsernameEmailExist(usernameCheck, emailCheck);
      } else {
        if (usernameCheck) {
          this.checkUsernameExist(usernameCheck);
        } else if (emailCheck) {
          this.checkEmailExist(emailCheck);
        }
      }
    } else {
      this.signUp();
    }
  }

  async checkUsernameEmailExist(usernameCheck: boolean, emailCheck: boolean) {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
    });
    await loading.present();

    if (usernameCheck && emailCheck) {
      let message = '';
      message =
        'Tải khoản và Email của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác. ';
      const alert = await this.alertController.create({
        header: 'Đăng ký thất bại',
        message: message,
        buttons: ['Đồng ý'],
      });

      loading.dismiss();
      await alert.present();
    } else {
      loading.dismiss();
      console.log('none console.log(usernameCheck)');
    }
  }

  async checkUsernameExist(usernameCheck: boolean) {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
    });
    await loading.present();

    if (usernameCheck) {
      let message = '';
      message =
        'Tải khoản của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác. ';
      console.log(usernameCheck);
      const alert = await this.alertController.create({
        header: 'Đăng ký thất bại',
        message: message,
        buttons: ['Đồng ý'],
      });

      loading.dismiss();
      await alert.present();
    } else {
      loading.dismiss();
      console.log('none console.log(usernameCheck)');
    }
  }

  async checkEmailExist(emailCheck: boolean) {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
    });
    await loading.present();
    if (emailCheck) {
      let message = '';
      message =
        'Email của bạn đã được sử dụng để đăng ký, vui lòng sử dụng tài khoản khác. ';
      console.log(emailCheck);
      const alert = await this.alertController.create({
        header: 'Đăng ký thất bại',
        message: message,
        buttons: ['Đồng ý'],
      });
      loading.dismiss();
      await alert.present();
    } else {
      loading.dismiss();
      console.log('none  console.log(emailCheck))');
    }
  }
}

