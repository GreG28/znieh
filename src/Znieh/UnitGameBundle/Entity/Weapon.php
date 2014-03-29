<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\ExecutionContextInterface;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Weapon
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Znieh\UnitGameBundle\Entity\WeaponRepository")
 * @Assert\Callback(methods={"isWeaponValid"})
 * @ExclusionPolicy("all")
 */

class Weapon
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="weapons", cascade={"persist"})
     */
    private $user;

    /**
    * @ORM\ManyToMany(targetEntity="Znieh\VillageGameBundle\Entity\WeaponPart", cascade={"persist"})
    * @Expose
    */
    private $parts;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\WeaponType", cascade={"persist"})
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $type;

    public function getImg()
    {
        $i = rand(1,3);

        $type = "sword";
        switch ($this->type->getName()) {
            case 'Épée':
                $type = "sword";
                break;
            case 'Hache':
                $type = "axe";
                break;
            case 'Marteau':
                $type = "hammer";
                break;
            case 'Arc':
                $type = "bow";
                break;
            default:
                break;
        }
        return $type . '/' . $i;
    }

    public function getPoints()
    {
        $i = 0;
        foreach ($this->parts as $part) {
            $i += $part->getPoints();
        }
        return $i;
    }

    public function isWeaponValid(ExecutionContextInterface $context)
    {

        foreach ($this->parts as $key => $part) {
            if ($key == 0) {
                $availablesTypes = $part->getType()->getTypes();
            }
            foreach ($availablesTypes as $availableType) {
                $found = false;
                foreach ($part->getType()->getTypes() as $type) {
                    if ($type->getName() == $availableType->getName()) {
                        $found = true;
                    }
                }
                if ($found === false) {
                    $availablesTypes->removeElement($availableType);
                }
            }
        }
        if ($availablesTypes->get(0) == null) {
            $context->addViolationAt('parts', 'Impossible de créer cette arme !', array(), null);
        } else {
            $this->type = $availablesTypes->get(0);
        }
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
     * Constructor
     */
    public function __construct()
    {
        $this->parts = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Weapon
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add parts
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponPart $parts
     *
     * @return Weapon
     */
    public function addPart(\Znieh\VillageGameBundle\Entity\WeaponPart $parts)
    {
        $this->parts[] = $parts;

        return $this;
    }

    /**
     * Remove parts
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponPart $parts
     */
    public function removePart(\Znieh\VillageGameBundle\Entity\WeaponPart $parts)
    {
        $this->parts->removeElement($parts);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getParts()
    {
        return $this->parts;
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\WeaponType $type
     *
     * @return Weapon
     */
    public function setType(\Znieh\VillageGameBundle\Entity\WeaponType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\WeaponType
     */
    public function getType()
    {
        return $this->type;
    }
}
