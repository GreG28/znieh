<?php

namespace Znieh\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Znieh\UserBundle\Entity\Ressource;


/**
 * @ORM\Entity()
 * @ORM\Table(name="fos_user")
**/
class User extends BaseUser
{
    /**
    * @ORM\OneToOne(targetEntity="Znieh\UserBundle\Entity\Ressource", cascade={"persist"})
    */
    private $ressource;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Assert\NotBlank(message="Entrez votre prénom.", groups={"Profile"})
     * @Assert\Length(min=2, max=255, minMessage="Le prénom est trop court.", maxMessage="Le prénom est trop long.", groups={"Profile"})
     */
    protected $firstname;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     *
     * @Assert\NotBlank(message="Entrez votre nom.", groups={"Profile"})
     * @Assert\Length(min=2, max=255, minMessage="Le nom est trop court.", maxMessage="Le nom est trop long.", groups={"Profile"})
     */
    protected $lastname;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     *
     */
    private $expiresUntil;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true, name="facebookId")
     *
     */
    protected $facebookId;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=true, name="token")
     *
     */
    private $token;

    /**
    * @ORM\OneToMany(targetEntity="Znieh\UnitGameBundle\Entity\Team", mappedBy="user", cascade={"persist"})
    */
    private $teams;

    /**
    * @ORM\OneToMany(targetEntity="Znieh\UnitGameBundle\Entity\Unit", mappedBy="user", cascade={"persist"})
    */
    private $units;

    /**
    * @ORM\OneToMany(targetEntity="Znieh\UnitGameBundle\Entity\Armor", mappedBy="user", cascade={"persist"})
    */
    private $armors;

    /**
    * @ORM\OneToMany(targetEntity="Znieh\UnitGameBundle\Entity\Weapon", mappedBy="user", cascade={"persist"})
    */
    private $weapons;



    public function __construct()
    {
        parent::__construct();
        $this->token = uniqid('', true);
        $this->ressource = new Ressource();
    }

    public function isGranted($role)
    {
        return in_array($role, $this->getRoles());
    }

    public function serialize()
    {
        return serialize(array($this->facebookId, parent::serialize()));
    }

    public function unserialize($data)
    {
        list($this->facebookId, $parentData) = unserialize($data);
        parent::unserialize($parentData);
    }

    public function isAccountNonExpired()
    {
        if (true === $this->expired) {
            if (null !== $this->expiresUntil && $this->expiresUntil->getTimestamp() < time()) {
                $this->expired = false;
                $this->expiresAt = null;
                $this->expiresUntil = null;
                return true;
            }
            return false;
        }

        if (null !== $this->expiresAt && $this->expiresAt->getTimestamp() < time()) {
            return false;
        }

        return true;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get token
     *
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * Modify expiresUntil
     *
     * @return User
     */
    public function modifyExpiresUntil($modification)
    {
        if (!$this->expiresUntil) {
            $this->expiresUntil = new \DateTime();
        }
        $this->expiresUntil->modify($modification);

        return $this;
    }

    /**
     * Set expiresUntil
     *
     * @param \DateTime $expiresUntil
     * @return User
     */
    public function setExpiresUntil(\DateTime $expiresUntil = null)
    {
        $this->expiresUntil = $expiresUntil;

        return $this;
    }

    /**
     * Get expiresUntil
     *
     * @return \DateTime
     */
    public function getExpiresUntil()
    {
        return $this->expiresUntil;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return User
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    /**
     * Get the full name of the user (first + last name)
     * @return string
     */
    public function getFullName()
    {
        return $this->getFirstname() . ' ' . $this->getLastname();
    }

     /**
     * @param string $facebookId
     * @return void
     */
    public function setFacebookId($facebookId)
    {
        $this->facebookId = $facebookId;
        //$this->setUsername($facebookId);
    }

    /**
     * @return string
     */
    public function getFacebookId()
    {
        return $this->facebookId;
    }

    /**
     * @param Array
     */
    public function setFBData($fbdata)
    {
        if (isset($fbdata['id'])) {
            $this->setFacebookId($fbdata['id']);
            $this->addRole('ROLE_FACEBOOK');
        }
        if (isset($fbdata['first_name'])) {
            $this->setFirstname($fbdata['first_name']);
            if ($this->getUsername() == null) {
                $this->setUsername($fbdata['first_name']);
            }
        }
        if (isset($fbdata['last_name'])) {
            $this->setLastname($fbdata['last_name']);
        }
        if (isset($fbdata['email'])) {
            $this->setEmail($fbdata['email']);
        }
    }

    /**
    * @param Znieh\UserBundle\Entity\Ressource $ressource
    */
     public function setRessource(\Znieh\UserBundle\Entity\Ressource $ressource = null)
    {
        $this->ressource = $ressource;
    }
    /**
     * @return Znieh\UserBundle\Entity\Ressource
     */
     public function getRessource()
     {
        return $this->ressource;
     }

    /**
     * Set token
     *
     * @param string $token
     *
     * @return User
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * Add teams
     *
     * @param \Znieh\UnitGameBundle\Entity\Team $teams
     *
     * @return User
     */
    public function addTeam(\Znieh\UnitGameBundle\Entity\Team $teams)
    {
        $this->teams[] = $teams;

        return $this;
    }

    /**
     * Remove teams
     *
     * @param \Znieh\UnitGameBundle\Entity\Team $teams
     */
    public function removeTeam(\Znieh\UnitGameBundle\Entity\Team $teams)
    {
        $this->teams->removeElement($teams);
    }

    /**
     * Get teams
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getTeams()
    {
        return $this->teams;
    }

    /**
     * Add units
     *
     * @param \Znieh\UnitGameBundle\Entity\Unit $units
     *
     * @return User
     */
    public function addUnit(\Znieh\UnitGameBundle\Entity\Unit $units)
    {
        $this->units[] = $units;

        return $this;
    }

    /**
     * Remove units
     *
     * @param \Znieh\UnitGameBundle\Entity\Unit $units
     */
    public function removeUnit(\Znieh\UnitGameBundle\Entity\Unit $units)
    {
        $this->units->removeElement($units);
    }

    /**
     * Get units
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUnits()
    {
        return $this->units;
    }

    /**
     * Add armors
     *
     * @param \Znieh\UnitGameBundle\Entity\Armor $armors
     *
     * @return User
     */
    public function addArmor(\Znieh\UnitGameBundle\Entity\Armor $armors)
    {
        $this->armors[] = $armors;

        return $this;
    }

    /**
     * Remove armors
     *
     * @param \Znieh\UnitGameBundle\Entity\Armor $armors
     */
    public function removeArmor(\Znieh\UnitGameBundle\Entity\Armor $armors)
    {
        $this->armors->removeElement($armors);
    }

    /**
     * Get armors
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArmors()
    {
        return $this->armors;
    }

    /**
     * Add weapons
     *
     * @param \Znieh\UnitGameBundle\Entity\Weapon $weapons
     *
     * @return User
     */
    public function addWeapon(\Znieh\UnitGameBundle\Entity\Weapon $weapons)
    {
        $this->weapons[] = $weapons;

        return $this;
    }

    /**
     * Remove weapons
     *
     * @param \Znieh\UnitGameBundle\Entity\Weapon $weapons
     */
    public function removeWeapon(\Znieh\UnitGameBundle\Entity\Weapon $weapons)
    {
        $this->weapons->removeElement($weapons);
    }

    /**
     * Get weapons
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWeapons()
    {
        return $this->weapons;
    }
}
